// noinspection DuplicatedCode

/**
 * @file KeyboardLayouts
 * @author Scott Mitting (https://github.com/mittingphx)
 * @license MIT
 * @description
 * Defines the available keyboard layouts for the keyboard tester.
 *
 * Implement a new function under KeyboardDefinitions to add new keyboards.
 * Be sure to update the getOptions() function to make your new layout
 * available from the keyboard model dropdown.
 *
 * See getWindowsLogitech2Keyboard for an example of how to add a layout that
 * has only minor differences from an existing layout.
 * */

import {Keyboard, KeyboardModel} from './KeyboardTester.js';

/**
 * Definitions of the shapes of various keyboards.
 */
export class KeyboardDefinitions {

    /**
     * Returns all available keyboards.
     * @return {KeyboardModel[]}
     */
    static getOptions() {
        return [
            new KeyboardModel('cheap', 'Generic Windows Keyboard', KeyboardDefinitions.getWindowsGenericKeyboard),
            new KeyboardModel('hp-lowend', 'HP Low End Desktop Keyboard', KeyboardDefinitions.getWindowsHPDesktopKeyboard),
            new KeyboardModel('logitech', 'Logitech Windows Desktop Keyboard', KeyboardDefinitions.getWindowsLogitechKeyboard),
            new KeyboardModel('logitech2', 'Logitech Windows Desktop Keyboard 2', KeyboardDefinitions.getWindowsLogitech2Keyboard),
            new KeyboardModel('macbookpro', 'Macbook Pro', KeyboardDefinitions.getMacBookProKeyboard)
        ];
    }


    /**
     * Returns the keys for a standard Windows keyboard.
     * This is based in a Logitech layout on Scott's desktop.
     * @returns {Keyboard}
     */
    static getWindowsLogitechKeyboard() {

        const keyboard = new Keyboard();
        {
            let row = keyboard.nextRow();
            row.addKey('Esc', 'Escape');
            row.addGap(15);
            row.addKey('F1', 'F1');
            row.addKey('F2', 'F2');
            row.addKey('F3', 'F3');
            row.addKey('F4', 'F4');
            row.addGap(15);
            row.addKey('F5', 'F5');
            row.addKey('F6', 'F6');
            row.addKey('F7', 'F7');
            row.addKey('F8', 'F8');
            row.addGap(15);
            row.addKey('F9', 'F9');
            row.addKey('F10', 'F10');
            row.addKey('F11', 'F11');
            row.addKey('F12', 'F12');
            row.addGap(10);
            row.addKey('prsc', 'f13');
            row.addKey('sclk', 'ScrollLock');
            row.addKey('pause', 'Pause');
        }
        {
            let row = keyboard.nextRow(5);
            row.addKey('`', 'Backquote', null, '~');
            row.addKey('1', 'Digit1', null, '!');
            row.addKey('2', 'Digit2', null, '@');
            row.addKey('3', 'Digit3', null, '#');
            row.addKey('4', 'Digit4', null, '$');
            row.addKey('5', 'Digit5', null, '%');
            row.addKey('6', 'Digit6', null, '^');
            row.addKey('7', 'Digit7', null, '&');
            row.addKey('8', 'Digit8', null, '*');
            row.addKey('9', 'Digit9', null, '(');
            row.addKey('0', 'Digit0', null, ')');
            row.addKey('-', 'Minus', null, '_');
            row.addKey('=', 'Equal', null, '+');
            row.addKey('Backspace', 'Backspace', 45);
            row.addGap(10);
            row.addKey('ins', 'Insert');
            row.addKey('home', 'Home');
            row.addKey('pgup', 'PageUp');
            row.addGap(10);
            row.addKey('numlock', 'NumLock');
            row.addKey('/', 'NumpadDivide');
            row.addKey('*', 'NumpadMultiply');
            row.addKey('-', 'NumpadSubtract');
        }
        {
            let row = keyboard.nextRow();
            row.addKey('Tab', 'Tab', 30);
            row.addKey('q', 'KeyQ');
            row.addKey('w', 'KeyW');
            row.addKey('e', 'KeyE');
            row.addKey('r', 'KeyR');
            row.addKey('t', 'KeyT');
            row.addKey('y', 'KeyY');
            row.addKey('u', 'KeyU');
            row.addKey('i', 'KeyI');
            row.addKey('o', 'KeyO');
            row.addKey('p', 'KeyP');
            row.addKey('[', 'BracketLeft');
            row.addKey(']', 'BracketRight');
            row.addKey('\\', 'Backslash', 35);
            row.addGap(10);
            row.addKey('del', 'Delete');
            row.addKey('end', 'End');
            row.addKey('pgdn', 'PageDown');
            row.addGap(10);
            row.addKey('7', 'Numpad7');
            row.addKey('8', 'Numpad8');
            row.addKey('9', 'Numpad9');
            let addKey = row.addKey('+', 'NumpadAdd');
            addKey.size.height = keyboard.keySize.height * 2;
        }
        {
            let row = keyboard.nextRow();
            row.addKey('Caps', 'CapsLock', 35);
            row.addKey('a', 'KeyA');
            row.addKey('s', 'KeyS');
            row.addKey('d', 'KeyD');
            row.addKey('f', 'KeyF');
            row.addKey('g', 'KeyG');
            row.addKey('h', 'KeyH');
            row.addKey('j', 'KeyJ');
            row.addKey('k', 'KeyK');
            row.addKey('l', 'KeyL');
            row.addKey(';', 'Semicolon', null, ':');
            row.addKey('\'', 'Quote', null, '"');
            row.addKey('Enter', 'Enter', 50);
            row.addGap(80);
            row.addKey('4', 'Numpad4');
            row.addKey('5', 'Numpad5');
            row.addKey('6', 'Numpad6');
        }
        {
            let row = keyboard.nextRow();
            row.addKey('Shift', 'ShiftLeft', 45);
            row.addKey('z', 'KeyZ');
            row.addKey('x', 'KeyX');
            row.addKey('c', 'KeyC');
            row.addKey('v', 'KeyV');
            row.addKey('b', 'KeyB');
            row.addKey('n', 'KeyN');
            row.addKey('m', 'KeyM');
            row.addKey(',', 'Comma', null, '<');
            row.addKey('.', 'Period', null, '>');
            row.addKey('/', 'Slash', null, '?');
            row.addKey('Shift', 'ShiftRight', 60);
            row.addGap(10);
            row.addGap(20);
            row.addKey('↑', 'ArrowUp');
            row.addGap(20);
            row.addGap(10);
            row.addKey('1', 'Numpad1');
            row.addKey('2', 'Numpad2');
            row.addKey('3', 'Numpad3');
            let enterKey = row.addKey('Enter', 'NumpadEnter');
            enterKey.size.height = keyboard.keySize.height * 2;
        }
        {
            let row = keyboard.nextRow();
            row.addKey('Ctrl', 'ControlLeft', 30);
            row.addKey('Win', 'MetaLeft', 25);
            row.addKey('Alt', 'AltLeft', 25);
            row.addKey('space', 'Space', 120);
            row.addKey('Alt', 'AltRight', 30);
            row.addKey('Menu', 'ContextMenu', 35);
            row.addKey('Ctrl', 'ControlRight', 40);
            row.addGap(10);
            row.addKey('←', 'ArrowLeft');
            row.addKey('↓', 'ArrowDown');
            row.addKey('→', 'ArrowRight');
            row.addGap(10);
            row.addKey('0', 'Numpad0', 40);
            row.addKey('.', 'NumpadDecimal');
        }

        return keyboard;
    }

    /**
     * Returns the keys for a standard Windows keyboard.
     * This is based in a Logitech layout.
     *
     * This is joe's desktop, which is almost identical to mine.
     *
     * @returns {Keyboard}
     */
    static getWindowsLogitech2Keyboard() {
        const keyboard = KeyboardDefinitions.getWindowsLogitechKeyboard();
        let fnKey = keyboard.getKey('ContextMenu');
        fnKey.displayChar = 'Fn';
        fnKey.keyCode = 'Fn';
        keyboard.remap();
        return keyboard;
    }


    /**
     * Returns the keys for a low-end HP desktop keyboard.
     * @returns {Keyboard}
     */
    static getWindowsHPDesktopKeyboard() {

        const keyboard = new Keyboard();
        {
            let row = keyboard.nextRow();
            row.addKey('Esc', 'Escape');
            row.addGap(19);
            row.addKey('F1', 'F1');
            row.addKey('F2', 'F2');
            row.addKey('F3', 'F3');
            row.addKey('F4', 'F4');
            row.addGap(13);
            row.addKey('F5', 'F5');
            row.addKey('F6', 'F6');
            row.addKey('F7', 'F7');
            row.addKey('F8', 'F8');
            row.addGap(13);
            row.addKey('F9', 'F9');
            row.addKey('F10', 'F10');
            row.addKey('F11', 'F11');
            row.addKey('F12', 'F12');
            row.addGap(10);
            row.addKey('prsc', 'f13');
            row.addKey('sclk', 'ScrollLock');
            row.addKey('pause', 'Pause');
        }
        {
            let row = keyboard.nextRow(5);
            row.addKey('`', 'Backquote', null, '~');
            row.addKey('1', 'Digit1', null, '!');
            row.addKey('2', 'Digit2', null, '@');
            row.addKey('3', 'Digit3', null, '#');
            row.addKey('4', 'Digit4', null, '$');
            row.addKey('5', 'Digit5', null, '%');
            row.addKey('6', 'Digit6', null, '^');
            row.addKey('7', 'Digit7', null, '&');
            row.addKey('8', 'Digit8', null, '*');
            row.addKey('9', 'Digit9', null, '(');
            row.addKey('0', 'Digit0', null, ')');
            row.addKey('-', 'Minus', null, '_');
            row.addKey('=', 'Equal', null, '+');
            row.addKey('Backspace', 'Backspace', 45);
            row.addGap(10);
            row.addKey('ins', 'Insert');
            row.addKey('home', 'Home');
            row.addKey('pgup', 'PageUp');
            row.addGap(10);
            row.addKey('numlock', 'NumLock');
            row.addKey('/', 'NumpadDivide');
            row.addKey('*', 'NumpadMultiply');
            row.addKey('-', 'NumpadSubtract');
        }
        {
            let row = keyboard.nextRow();
            row.addKey('Tab', 'Tab', 30);
            row.addKey('q', 'KeyQ');
            row.addKey('w', 'KeyW');
            row.addKey('e', 'KeyE');
            row.addKey('r', 'KeyR');
            row.addKey('t', 'KeyT');
            row.addKey('y', 'KeyY');
            row.addKey('u', 'KeyU');
            row.addKey('i', 'KeyI');
            row.addKey('o', 'KeyO');
            row.addKey('p', 'KeyP');
            row.addKey('[', 'BracketLeft');
            row.addKey(']', 'BracketRight');
            row.addKey('\\', 'Backslash', 35);
            row.addGap(10);
            row.addKey('del', 'Delete');
            row.addKey('end', 'End');
            row.addKey('pgdn', 'PageDown');
            row.addGap(10);
            row.addKey('7', 'Numpad7');
            row.addKey('8', 'Numpad8');
            row.addKey('9', 'Numpad9');
            let addKey = row.addKey('+', 'NumpadAdd');
            addKey.size.height = keyboard.keySize.height * 2;
        }
        {
            let row = keyboard.nextRow();
            row.addKey('Caps', 'CapsLock', 35);
            row.addKey('a', 'KeyA');
            row.addKey('s', 'KeyS');
            row.addKey('d', 'KeyD');
            row.addKey('f', 'KeyF');
            row.addKey('g', 'KeyG');
            row.addKey('h', 'KeyH');
            row.addKey('j', 'KeyJ');
            row.addKey('k', 'KeyK');
            row.addKey('l', 'KeyL');
            row.addKey(';', 'Semicolon', null, ':');
            row.addKey('\'', 'Quote', null, '"');
            row.addKey('Enter', 'Enter', 50);
            row.addGap(10);
            row.addGap(60);
            row.addGap(10);
            row.addKey('4', 'Numpad4');
            row.addKey('5', 'Numpad5');
            row.addKey('6', 'Numpad6');
        }
        {
            let row = keyboard.nextRow();
            row.addKey('Shift', 'ShiftLeft', 45);
            row.addKey('z', 'KeyZ');
            row.addKey('x', 'KeyX');
            row.addKey('c', 'KeyC');
            row.addKey('v', 'KeyV');
            row.addKey('b', 'KeyB');
            row.addKey('n', 'KeyN');
            row.addKey('m', 'KeyM');
            row.addKey(',', 'Comma', null, '<');
            row.addKey('.', 'Period', null, '>');
            row.addKey('/', 'Slash', null, '?');
            row.addKey('Shift', 'ShiftRight', 60);
            row.addGap(10);
            row.addGap(20);
            row.addKey('↑', 'ArrowUp');
            row.addGap(20);
            row.addGap(10);
            row.addKey('1', 'Numpad1');
            row.addKey('2', 'Numpad2');
            row.addKey('3', 'Numpad3');
            let enterKey = row.addKey('Enter', 'NumpadEnter');
            enterKey.size.height = keyboard.keySize.height * 2;
        }
        {
            let row = keyboard.nextRow();
            row.addKey('Ctrl', 'ControlLeft', 30);
            row.addKey('Win', 'MetaLeft', 25);
            row.addKey('Alt', 'AltLeft', 25);
            row.addKey('space', 'Space', 115);
            row.addKey('Alt', 'AltRight', 25);
            row.addKey('Win', 'MetaRight', 25);
            row.addKey('Menu', 'ContextMenu', 25);
            row.addKey('Ctrl', 'ControlRight', 35);
            row.addGap(10);
            row.addKey('←', 'ArrowLeft');
            row.addKey('↓', 'ArrowDown');
            row.addKey('→', 'ArrowRight');
            row.addGap(10);
            row.addKey('0', 'Numpad0', 40);
            row.addKey('.', 'NumpadDecimal');
        }

        return keyboard;
    }


    /**
     * Returns the keys for a standard Windows keyboard
     * based on a cheap generic layout.
     * @returns {Keyboard}
     */
    static getWindowsGenericKeyboard() {

        const keyboard = new Keyboard();
        {
            let row = keyboard.nextRow();
            row.addKey('Esc', 'Escape');
            row.addGap(19);
            row.addKey('F1', 'F1');
            row.addKey('F2', 'F2');
            row.addKey('F3', 'F3');
            row.addKey('F4', 'F4');
            row.addGap(13);
            row.addKey('F5', 'F5');
            row.addKey('F6', 'F6');
            row.addKey('F7', 'F7');
            row.addKey('F8', 'F8');
            row.addGap(13);
            row.addKey('F9', 'F9');
            row.addKey('F10', 'F10');
            row.addKey('F11', 'F11');
            row.addKey('F12', 'F12');
            row.addGap(10);
            row.addKey('Power', 'Power');
            row.addKey('Sleep', 'Sleep');
            row.addKey('Wake', 'Wake');
        }
        {
            let row = keyboard.nextRow(5);
            row.addKey('`', 'Backquote', null, '~');
            row.addKey('1', 'Digit1', null, '!');
            row.addKey('2', 'Digit2', null, '@');
            row.addKey('3', 'Digit3', null, '#');
            row.addKey('4', 'Digit4', null, '$');
            row.addKey('5', 'Digit5', null, '%');
            row.addKey('6', 'Digit6', null, '^');
            row.addKey('7', 'Digit7', null, '&');
            row.addKey('8', 'Digit8', null, '*');
            row.addKey('9', 'Digit9', null, '(');
            row.addKey('0', 'Digit0', null, ')');
            row.addKey('-', 'Minus', null, '_');
            row.addKey('=', 'Equal', null, '+');
            row.addKey('Backspace', 'Backspace', 45);
            row.addGap(10);
            row.addKey('prsc', 'f13');
            row.addKey('sclk', 'ScrollLock');
            row.addKey('pause', 'Pause');
            row.addGap(10);
            row.addKey('numlock', 'NumLock');
            row.addKey('/', 'NumpadDivide');
            row.addKey('*', 'NumpadMultiply');
            row.addKey('-', 'NumpadSubtract');
        }
        {
            let row = keyboard.nextRow();
            row.addKey('Tab', 'Tab', 30);
            row.addKey('q', 'KeyQ');
            row.addKey('w', 'KeyW');
            row.addKey('e', 'KeyE');
            row.addKey('r', 'KeyR');
            row.addKey('t', 'KeyT');
            row.addKey('y', 'KeyY');
            row.addKey('u', 'KeyU');
            row.addKey('i', 'KeyI');
            row.addKey('o', 'KeyO');
            row.addKey('p', 'KeyP');
            row.addKey('[', 'BracketLeft');
            row.addKey(']', 'BracketRight');
            let enterKey = row.addKey('enter', 'Enter', 35);
            enterKey.size.height = keyboard.keySize.height * 2;
            enterKey.zIndex = '0'; // force to be under the next row's key for part of the enter key (easiest way to make that shape)

            row.addGap(10);
            row.addKey('ins', 'Insert');
            row.addKey('home', 'Home');
            row.addKey('pgup', 'PageUp');
            row.addGap(10);
            row.addKey('7', 'Numpad7');
            row.addKey('8', 'Numpad8');
            row.addKey('9', 'Numpad9');
            let addKey = row.addKey('+', 'NumpadAdd');
            addKey.size.height = keyboard.keySize.height * 2;
        }
        {
            let row = keyboard.nextRow();
            row.addKey('Caps', 'CapsLock', 35);
            row.addKey('a', 'KeyA');
            row.addKey('s', 'KeyS');
            row.addKey('d', 'KeyD');
            row.addKey('f', 'KeyF');
            row.addKey('g', 'KeyG');
            row.addKey('h', 'KeyH');
            row.addKey('j', 'KeyJ');
            row.addKey('k', 'KeyK');
            row.addKey('l', 'KeyL');
            row.addKey(';', 'Semicolon', null, ':');
            row.addKey('\'', 'Quote', null, '"');
            row.addKey('\\', 'Backslash');
            row.addGap(30);
            row.addGap(10);
            row.addKey('del', 'Delete');
            row.addKey('end', 'End');
            row.addKey('pgdn', 'PageDown');
            row.addGap(10);
            row.addKey('4', 'Numpad4');
            row.addKey('5', 'Numpad5');
            row.addKey('6', 'Numpad6');
        }
        {
            let row = keyboard.nextRow();
            row.addKey('Shift', 'ShiftLeft', 45);
            row.addKey('z', 'KeyZ');
            row.addKey('x', 'KeyX');
            row.addKey('c', 'KeyC');
            row.addKey('v', 'KeyV');
            row.addKey('b', 'KeyB');
            row.addKey('n', 'KeyN');
            row.addKey('m', 'KeyM');
            row.addKey(',', 'Comma', null, '<');
            row.addKey('.', 'Period', null, '>');
            row.addKey('/', 'Slash', null, '?');
            row.addKey('Shift', 'ShiftRight', 60);
            row.addGap(10);
            row.addGap(20);
            row.addKey('↑', 'ArrowUp');
            row.addGap(20);
            row.addGap(10);
            row.addKey('1', 'Numpad1');
            row.addKey('2', 'Numpad2');
            row.addKey('3', 'Numpad3');
            let enterKey = row.addKey('Enter', 'NumpadEnter');
            enterKey.size.height = keyboard.keySize.height * 2;
        }
        {
            let row = keyboard.nextRow();
            row.addKey('Ctrl', 'ControlLeft', 30);
            row.addKey('Win', 'MetaLeft', 25);
            row.addKey('Alt', 'AltLeft', 25);
            row.addKey('space', 'Space', 115);
            row.addKey('Alt', 'AltRight', 25);
            row.addKey('Win', 'MetaRight', 25);
            row.addKey('Menu', 'ContextMenu', 25);
            row.addKey('Ctrl', 'ControlRight', 35);
            row.addGap(10);
            row.addKey('←', 'ArrowLeft');
            row.addKey('↓', 'ArrowDown');
            row.addKey('→', 'ArrowRight');
            row.addGap(10);
            row.addKey('0', 'Numpad0', 40);
            row.addKey('.', 'NumpadDecimal');
        }

        return keyboard;
    }


    /**
     * Returns the keys for a Macbook Pro keyboard 2008+
     * @returns {Keyboard}
     */
    static getMacBookProKeyboard() {

        const keyboard = new Keyboard();
        {
            let row = keyboard.nextRow();
            row.addKey('Esc', 'Escape', 30);
            row.addKey('F1', 'F1');
            row.addKey('F2', 'F2');
            row.addKey('F3', 'F3');
            row.addKey('F4', 'F4');
            row.addKey('F5', 'F5');
            row.addKey('F6', 'F6');
            row.addKey('F7', 'F7');
            row.addKey('F8', 'F8');
            row.addKey('F9', 'F9');
            row.addKey('F10', 'F10');
            row.addKey('F11', 'F11');
            row.addKey('F12', 'F12');
            row.addKey('F13', 'f13', 25);
        }
        {
            let row = keyboard.nextRow(5);
            row.addKey('`', 'Backquote', null, '~');
            row.addKey('1', 'Digit1', null, '!');
            row.addKey('2', 'Digit2', null, '@');
            row.addKey('3', 'Digit3', null, '#');
            row.addKey('4', 'Digit4', null, '$');
            row.addKey('5', 'Digit5', null, '%');
            row.addKey('6', 'Digit6', null, '^');
            row.addKey('7', 'Digit7', null, '&');
            row.addKey('8', 'Digit8', null, '*');
            row.addKey('9', 'Digit9', null, '(');
            row.addKey('0', 'Digit0', null, ')');
            row.addKey('-', 'Minus', null, '_');
            row.addKey('=', 'Equal', null, '+');
            row.addKey('delete', 'Backspace', 35);
        }
        {
            let row = keyboard.nextRow();
            row.addKey('tab', 'Tab', 30);
            row.addKey('q', 'KeyQ');
            row.addKey('w', 'KeyW');
            row.addKey('e', 'KeyE');
            row.addKey('r', 'KeyR');
            row.addKey('t', 'KeyT');
            row.addKey('y', 'KeyY');
            row.addKey('u', 'KeyU');
            row.addKey('i', 'KeyI');
            row.addKey('o', 'KeyO');
            row.addKey('p', 'KeyP');
            row.addKey('[', 'BracketLeft');
            row.addKey(']', 'BracketRight');
            row.addKey('\\', 'Backslash', 25, '|');
        }
        {
            let row = keyboard.nextRow();
            row.addKey('caps', 'CapsLock', 35);
            row.addKey('a', 'KeyA');
            row.addKey('s', 'KeyS');
            row.addKey('d', 'KeyD');
            row.addKey('f', 'KeyF');
            row.addKey('g', 'KeyG');
            row.addKey('h', 'KeyH');
            row.addKey('j', 'KeyJ');
            row.addKey('k', 'KeyK');
            row.addKey('l', 'KeyL');
            row.addKey(';', 'Semicolon', null, ':');
            row.addKey('\'', 'Quote', null, '"');
            row.addKey('Return', 'Enter', 40);
        }
        {
            let row = keyboard.nextRow();
            row.addKey('Shift', 'ShiftLeft', 45);
            row.addKey('z', 'KeyZ');
            row.addKey('x', 'KeyX');
            row.addKey('c', 'KeyC');
            row.addKey('v', 'KeyV');
            row.addKey('b', 'KeyB');
            row.addKey('n', 'KeyN');
            row.addKey('m', 'KeyM');
            row.addKey(',', 'Comma', null, '<');
            row.addKey('.', 'Period', null, '>');
            row.addKey('/', 'Slash', null, '?');
            row.addKey('Shift', 'ShiftRight', 50);
        }
        {
            let row = keyboard.nextRow();
            row.addKey('Fn', 'Function', 20);
            row.addKey('⌃', 'ControlLeft', 20);
            row.addKey('⌥', 'AltLeft', 20);
            row.addKey('⌘', 'MetaLeft', 25);
            row.addKey('space', 'Space', 105);
            row.addKey('⌘', 'MetaRight', 25);
            row.addKey('⌥', 'AltRight', 20);

            let left = row.addKey('←', 'ArrowLeft');
            left.size.height = 10;
            let down = row.addKey('↓', 'ArrowDown');
            down.size.height = 10;
            let right = row.addKey('→', 'ArrowRight');
            right.size.height = 10;
            let up = row.addKey('↑', 'ArrowUp');
            up.size.height = 10;
            up.position.x = down.position.x;
            left.position.y += 10;
            down.position.y += 10;
            right.position.y += 10;
        }

        return keyboard;
    }
}
