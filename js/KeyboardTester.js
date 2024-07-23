// noinspection DuplicatedCode

/**
 * @file KeyboardTester
 * @author Scott Mitting (https://github.com/mittingphx)
 * @license MIT
 * @description
 * Simple keyboard testing tool.
 * */

/**
 * @typedef ISize
 * width and height of a shape
 * @property {number|null} width in pixels, null meaning use default
 * @property {number|null} height in pixels, null meaning use default
 */

/**
 * @typedef IPosition
 * the placement of a shape
 * @property {number} x
 * @property {number} y
 */

/**
 * Describes the state of a key
 * @enum {string}
 */
const KeyState = {
    NeverPressed:   'NeverPressed',
    Pressed:        'Pressed',
    Down:           'Down'
}

/**
 * Represents one key that can be pressed on the keyboard.
 */
class KeyShape {
    /**
     * Character to display on this key
     * @type {string}
     */
    displayChar = ' ';

    /**
     * Character to display on the top of this key.
     * @type {string}
     */
    shiftDisplayChar = ' ';

    /**
     * Key code to detect
     * @type {string}
     */
    keyCode = ' ';

    /**
     * Pixel width of the key
     * @type {ISize}
     */
    size = { width: 20, height: 20 };

    /**
     * Where the key should be placed (controlled by Keyboard class)
     * @type {IPosition}
     */
    position = { x: 0, y: 0 };

    /**
     * Custom override for z-index if needed.
     * @type {string|null}
     */
    zIndex = null;

    /**
     * State of the key
     * @type {KeyState}
     */
    state = KeyState.NeverPressed;

    /**
     * The DOM element for the key, created by the Keyboard class.
     * @type {HTMLElement}
     */
    $ref = null;

    /**
     * Constructor accepts optional common values.
     * @param {string} char display character
     * @param {string} keyCode key code to detect
     */
    constructor(char, keyCode) {
        this.displayChar = char;
        this.keyCode = keyCode;
    }
}


/**
 * Definition of the keyboard, containing all the keys and methods for
 * rendering them on the screen and handling user input.
 */
class Keyboard {

    /**
     * Keys in the keyboard
     * @type {KeyShape[]}
     */
    keys = [];

    /**
     * Starting position for the next row
     * @type {IPosition}
     */
    nextRowPosition = { x: 10, y: 10 };

    /**
     * The margins around the keyboard
     * @type {IPosition}
     */
    startPosition = { x: 10, y: 10 };

    /**
     * The default size of a key
     * @type {ISize}
     */
    keySize = { width: 20, height: 20 };

    /**
     * The root DOM element for the keyboard
     * @type {HTMLElement}
     */
    $dom = null;

    /**
     * Maps keycodes to the specific key objects
     * @type {Object.<string, KeyShape>}
     */
    #map = {};

    /**
     * Default constructor
     */
    constructor() {

        this.$dom = document.querySelector('.keyboard');
        if (!this.$dom) {
            this.$dom = document.createElement('div');
            this.$dom.className = 'keyboard';
            document.body.appendChild(this.$dom);
        }
        this.nextRowPosition = deepCopy(this.startPosition);
    }

    /**
     * Adds a key to the keyboard
     * @param {KeyShape} key
     */
    addKey(key) {
        this.keys.push(key);
        this.#map[key.keyCode] = key;

        const $ref = document.createElement('div');
        $ref.id = 'key_' + key.keyCode;
        key.$ref = $ref;
    }

    /**
     * Creates a new row for adding keys to this keyboard.
     * @param gap {number} optional gap between rows
     * @return {KeyboardRow}
     */
    nextRow(gap = 0) {
        this.nextRowPosition.y += gap;
        let row = new KeyboardRow(this, this.nextRowPosition);
        this.nextRowPosition.x = this.startPosition.x;
        this.nextRowPosition.y += this.keySize.height;
        return row;
    }

    /**
     * Handles a key down event on the keyboard
     * @param keyCode {string}
     */
    onKeyDown(keyCode) {
        const key = this.#map[keyCode];
        if (key) {
            key.state = KeyState.Down;
            this.renderKey(key);
        }
    }

    /**
     * Handles a key up event on the keyboard
     * @param keyCode {string}
     */
    onKeyUp(keyCode) {
        const key = this.#map[keyCode];
        if (key) {
            key.state = KeyState.Pressed;
            this.renderKey(key);
        }
    }

    /**
     * Resets all key states and re-renders the keyboard.
     */
    clear() {
        for (const key of this.keys) {
            key.state = KeyState.NeverPressed;
            this.renderKey(key);
        }
    }

    /**
     * Rebuilds the visual representation of the keyboard.
     */
    render() {
        this.$dom.innerHTML = '';
        for (const key of this.keys) {
            this.renderKey(key);
        }
    }

    /**
     * Renders the visual representation of a single key
     * @param key {KeyShape}
     */
    renderKey(key) {
        if (!key.$ref.parentElement){
            this.$dom.appendChild(key.$ref);
        }

        key.$ref.className = 'key ' + key.state;
        key.$ref.style.left = key.position.x + 'px';
        key.$ref.style.top = key.position.y + 'px';
        if (key.size.width) {
            key.$ref.style.width = key.size.width + 'px';
        }
        if (key.zIndex) {
            key.$ref.style.zIndex = key.zIndex;
        }
        if (key.size.height) {
            key.$ref.style.height = key.size.height + 'px';
            if (!key.zIndex) {
                key.$ref.style.zIndex = '10'; // force tall keys to be above keys below it
            }
        }

        // don't use two rows of text on short keys
        if (key.size.height !== null && key.size.height <= 10) {
            key.$ref.innerHTML = key.displayChar;
        }
        else {
            key.$ref.innerHTML = (key.shiftDisplayChar || '') + '<br>' +  key.displayChar;
        }
    }

    /**
     * Recalculates the map for all keys, needed if a keyCode changes.
     */
    remap() {
        this.#map = {};
        for (const key of this.keys) {
            this.#map[key.keyCode] = key;
        }
    }


    /**
     * Gets a key object by code, which allows keyboards that are almost
     * identical to another model to just redefine the keys that differ.
     * @param keyCode
     * @return {KeyShape}
     */
    getKey(keyCode) {
        let key = this.#map[keyCode];
        if (key === null) {
            console.error('could not find key ' + keyCode);
            return null;
        }
        return key;
    }

}

/**
 * Provides a simple means for defining keys that are in the same row
 * on the keyboard.
 */
class KeyboardRow {

    /**
     * The upper-left corner of the row.
     * @type {IPosition}
     */
    position = { x: 0, y: 0 };


    /**
     * The next position where a key will be placed.
     * @type {IPosition}
     */
    nextPosition = { x: 0, y: 0 };

    /**
     * The keyboard the keys will be placed in.
     * @type {Keyboard}
     */
    keyboard = null;

    /**
     * Requires the keyboard where the keys will be placed.
     * @param keyboard {Keyboard}
     * @param position {IPosition}
     */
    constructor(keyboard, position) {
        this.keyboard = keyboard;
        this.position = deepCopy(position);
        this.nextPosition = deepCopy(this.position);
    }

    /**
     * Adds a key to the row.
     * @param displayChar {string} character to display
     * @param keyCode {string} key code to detect
     * @param width {number|null} optional width of the key (if a special size)
     * @param shiftChar {string|null} optional character to display in shift
     * @returns {KeyShape}
     */
    addKey(displayChar, keyCode, width = -1, shiftChar = null) {
        const key = new KeyShape(displayChar, keyCode);
        if (shiftChar) {
            key.shiftDisplayChar = shiftChar;
        }
        key.position = deepCopy(this.nextPosition);
        key.size.width = width > 0 ? width : null;
        key.size.height = null;
        let size = applyDefaultsTo(key.size, this.keyboard.keySize);
        this.nextPosition.x += size.width;
        this.keyboard.addKey(key);
        return key;
    }

    /**
     * Adds a horizontal gap between keys into the row.
     * @param {number} width
     */
    addGap(width) {
        this.nextPosition.x += width;
    }

}

/**
 * Represents the available keyboard models.
 */
class KeyboardModel {
    /**
     * ID to show use as the option's value in the <select>
     * @type {string}
     */
    id = '';

    /**
     * The name to display in the <select>
     * @type {string}
     */
    name = '';

    /**
     * The function to use to create the keyboard.
     * @type {function}
     */
    keyboard = null;

    /**
     * @param id
     * @param name
     * @param fn
     */
    constructor(id, name, fn) {
        this.id = id;
        this.name = name;
        this.keyboard = fn;
    }
}

/**
 * Definitions of the shapes of various keyboards.  For now, I'm just
 * going to base this on the logitech keyboard I'm typing on right now.
 * If needed we could define keyboard with different layouts.
 */
class KeyboardDefinitions {

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

/**
 * Makes a copy of an object
 * @param obj
 * @return {*}
 */
function deepCopy(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    let ret = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            ret[key] = deepCopy(obj[key]);
        }
    }
    return ret;
}

/**
 * Any field in obj that is null or undefined will be set to the
 * default.  Does not affect the object itself.
 * @param obj {object} object to return
 * @param defaults {object} default values to use
 * @return {object} copy of the object with default values
 */
function applyDefaultsTo(obj, defaults) {
    let copy = deepCopy(obj);
    for (const key in defaults) {
        if (copy[key] === undefined || copy[key] === null) {
            copy[key] = defaults[key];
        }
    }
    return copy;
}

/**
 * Main javascript application for testing the keys of a keyboard.
 */
export class KeyboardTester {

    /**
     * The current keyboard.
     * @type {Keyboard}
     */
    keyboard = null;

    /**
     * Dropdown to select keyboard models
     * @type {HTMLSelectElement}
     */
    $ddlModel = null;

    /**
     * Button to clear key states
     * @type {HTMLButtonElement}
     */
    $btnClear = null;

    /**
     * The last width of the keyboard
     * @type {number|null}
     */
    #lastWidth = null;

    /**
     * Constructor starts running the keyboard tester.
     */
    constructor() {

        // grab DOM elements
        this.#initDOM();
        console.log('Starting Keyboard Tester...');

        // trigger selection from dropdown as current keyboard
        this.$ddlModel.dispatchEvent(new Event('change'));

        // keyboard event handlers
        document.onkeydown = (event) => {
            event.preventDefault();
            event.stopPropagation();
            console.log('event.key=' + event.key);
            console.log('event.code=' + event.code)
            this.keyboard.onKeyDown(event.code)
        }
        document.onkeyup = (event) => {
            event.preventDefault();
            event.stopPropagation();
            this.keyboard.onKeyUp(event.code)
        }
    }

    /**
     * Runs a function that creates a keyboard object.
     * @param fnKeyboard {function}
     */
    createKeyboard(fnKeyboard) {

        if (this.keyboard) {
            this.keyboard.clear();
        }

        console.log('Creating keyboard');
        this.keyboard = fnKeyboard();
        this.keyboard.render();
    }

    /**
     * Initializes DOM elements (besides the keyboard itself)
     */
    #initDOM() {

        // init dropdown
        this.$ddlModel = document.querySelector('.ddl-model');
        if (!this.$ddlModel) {
            this.$ddlModel = document.createElement('select');
            document.body.appendChild(this.$ddlModel);
            this.$ddlModel.className = 'ddl-model';
        }

        // populate with available keyboard models
        const models = KeyboardDefinitions.getOptions();
        this.$ddlModel.innerHTML = '';
        for (let i = 0; i < models.length; i++) {
            let model = models[i];
            let option = document.createElement('option');
            option.value = model.id;
            option.innerHTML = model.name;
            this.$ddlModel.appendChild(option);
        }

        // rebuild keyboard when a new model is selected
        this.$ddlModel.addEventListener('change', (event) => {
            let selected = models[event.target.selectedIndex];
            this.createKeyboard(selected.keyboard);
        });

        // init button for clearing key states
        this.$btnClear = document.querySelector('.btn-clear');
        if (!this.$btnClear) {
            this.$btnClear = document.createElement('button');
            this.$btnClear.innerHTML = 'Clear';
            document.body.appendChild(this.$btnClear);
        }
        this.$btnClear.className = 'btn btn-clear';
        this.$btnClear.onclick = () => {
            this.keyboard.clear();
        }

        // keep the keyboard as large as can fit inside its container
        setInterval(() => {
            this.scaleToParent();
        }, 100);
    }

    /**
     * Scales the keyboard to match the width of its parent.
     */
    scaleToParent() {
        // only scale if width has changed
        let element = this.keyboard.$dom;
        if (this.#lastWidth && this.#lastWidth === element.clientWidth) {
            return;
        }
        this.#lastWidth = element.clientWidth;

        // scale to fit nicely in container
        let parent = element.parentElement;
        let scaleX = parent.clientWidth / element.clientWidth;
        scaleX *= 0.9;
        element.style.transform = 'translate(-50%) scale(' + scaleX + ')';
    }
}

new KeyboardTester();