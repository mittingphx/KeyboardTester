// noinspection DuplicatedCode

/**
 * @file KeyboardTester
 * @author Scott Mitting (https://github.com/mittingphx)
 * @license MIT
 * @description
 * Simple keyboard testing tool.
 * */

import {KeyboardDefinitions} from "./KeyboardLayouts.js";

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
export class Keyboard {

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
export class KeyboardRow {

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
export class KeyboardModel {
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
        let parent = element.parentElement;
        if (this.#lastWidth && this.#lastWidth === parent.clientWidth) {
            return;
        }
        this.#lastWidth = parent.clientWidth;

        // scale to fit nicely in container
        let scaleX = parent.clientWidth / element.clientWidth;
        scaleX *= 0.9;
        element.style.transform = 'translate(-50%) scale(' + scaleX + ')';
    }
}

new KeyboardTester();