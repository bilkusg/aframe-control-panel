
const defaultLayout = {
  name: 'en-us',
  maxWidth: 11, // The maximum width of any row measured in standard size keys
  normal: [
    [
      {value: '1', },
      {value: '2', },
      {value: '3', },
      {value: '4', },
      {value: '5', },
      {value: '6', },
      {value: '7', },
      {value: '8', },
      {value: '9', },
      {value: '0', },
      {value: '', label: '<-', keyCode: 8, },
    ],
    [
      {value: 'q', },
      {value: 'w', },
      {value: 'e', },
      {value: 'r', },
      {value: 't', },
      {value: 'y', },
      {value: 'u', },
      {value: 'i', },
      {value: 'o', },
      {value: 'p', },
      {value: '\n', label:"Ent", height:2, keyCode: 13, },
    ],
    [
      {value: 'a', },
      {value: 's', },
      {value: 'd', },
      {value: 'f', },
      {value: 'g', },
      {value: 'h', },
      {value: 'j', },
      {value: 'k', },
      {value: 'l', },
      {value: '"', },
      // last one empty because Enter key spans 2 rows
    ],
    [
      {value: 'Shift', width:2, keyCode:16, toggle:'shift'},
      {value: 'z', },
      {value: 'x', },
      {value: 'c', },
      {value: 'v', },
      {value: 'b', },
      {value: 'n', },
      {value: 'm', },
      {value: 'Alt', width:2, keyCode: 18, toggle:'alt' },
    ],
    [
      {value: 'Cancel', width:2, keyCode: 24, type:'cancel' },
      {value: ' ', keyCode: 32, width:5, },
      {value: ',', },
      {value: '.', },
      {value: 'Submit', width:2, keyCode: 6, },
    ],
  ],
  shift: [
    [
      {value: '1', },
      {value: '2', },
      {value: '3', },
      {value: '4', },
      {value: '5', },
      {value: '6', },
      {value: '7', },
      {value: '8', },
      {value: '9', },
      {value: '0', },
      {value: '', label: '<-', keyCode: 8, },
    ],
    [
      {value: 'Q', },
      {value: 'W', },
      {value: 'E', },
      {value: 'R', },
      {value: 'T', },
      {value: 'Y', },
      {value: 'U', },
      {value: 'I', },
      {value: 'O', },
      {value: 'P', },
      {value: '\n', label:"Ent", height:2, keyCode: 13, },
    ],
    [
      {value: 'A', },
      {value: 'S', },
      {value: 'D', },
      {value: 'F', },
      {value: 'G', },
      {value: 'H', },
      {value: 'J', },
      {value: 'K', },
      {value: 'L', },
      {value: '"', },
      // last one empty because Enter key spans 2 rows
    ],
    [
      {value: 'Shift', width:2, keyCode:16, toggle:'shift'},
      {value: 'Z', },
      {value: 'X', },
      {value: 'C', },
      {value: 'V', },
      {value: 'B', },
      {value: 'N', },
      {value: 'M', },
      {value: 'Alt', width:2, keyCode: 18, toggle:'alt' },
    ],
    [
      {value: 'Cancel', width:2, keyCode: 24, },
      {value: ' ', keyCode: 32, width:5, },
      {value: ',', },
      {value: '.', },
      {value: 'Submit', width:2, keyCode: 6, },
    ],
  ],
  alt: [
    [
      {value: '1', },
      {value: '2', },
      {value: '3', },
      {value: '4', },
      {value: '5', },
      {value: '6', },
      {value: '7', },
      {value: '8', },
      {value: '9', },
      {value: '0', },
      {value: '', label: '<-', keyCode: 8, },
    ],
    [
      {value: '~', },
      {value: '`', },
      {value: '|', },
      {value: '(', },
      {value: ')', },
      {value: '^', },
      {value: '_', },
      {value: '-', },
      {value: '=', },
      {value: '!', },
      {value: '\n', label:"Ent", height:2, keyCode: 13, },
    ],
    [
      {value: '@', },
      {value: '#', },
      {value: '$', },
      {value: '%', },
      {value: '*', },
      {value: '[', },
      {value: ']', },
      {value: '#', },
      {value: '<', },
      {value: '?', },
      // last one empty because Enter key spans 2 rows
    ],
    [
      {value: 'Shift', width:2, keyCode:16, toggle:'shift'},
      {value: ':', },
      {value: ';', },
      {value: '{', },
      {value: '}', },
      {value: '/', },
      {value: '\\', },
      {value: '>', },
      {value: 'Alt', width:2, keyCode: 18, toggle:'alt' },
    ],
    [
      {value: 'Cancel', width:2, keyCode: 24, },
      {value: ' ', keyCode: 32, width:5, },
      {value: ',', },
      {value: '.', },
      {value: 'Submit', width:2, keyCode: 6, },
    ],
  ],
};

const KEYBOARD_PADDING = 0.02;
const KEY_PADDING = 0.004;
const KEY_SIZE = 0.04;

const registeredControlPanels = [];
const registerControlPanel = function(c) {
  registeredControlPanels.push({name:c.layoutStruct.name,panel:c});
};
const controlPanelNamed = function(n) {
  for(let i=0;i<registeredControlPanels.length;i++)
  {
    let p = registeredControlPanels[i];
    if (p.name === n) return p.panel;
  }
  return defaultControlPanel;
};

class ControlPanel {
  constructor(layout) {
    this.layoutStruct = layout || defaultLayout;
    this.activeMode = 'normal'; // 'normal', 'shift', 'alt'
    this.keyCodeLookup = {};
    this.keyCharLookup = {};
    this.ignoredKeys = new Set([
      16, // Shift
      17, // Ctrl
      18, // Alt
      20, // Caps Lock
      33, // PageUp
      34, // PageDown
      35, // End
      36, // Home
      45, // Insert
      46, // Delete
      112, // F1
      113, // F2
      114, // F3
      115, // F4
      116, // F5
      117, // F6
      118, // F7
      119, // F8
      120, // F9
      121, // F10
      122, // F11
      123, // F12
    ]);
    // Our layout panel has lots of options with defaults taken from others
    // The fixup method normalises everything and ensures each item is self-contained
    //
    const propNames = Object.getOwnPropertyNames(this.layoutStruct);
    for (let m=0;m<propNames.length;m++) {
      let mode = propNames[m];
      let keyRows = this.layoutStruct[mode] 
      if (! Array.isArray(keyRows)) { continue; }
      for (let i = 0; i < keyRows.length; i++) {
        const keys = keyRows[i];
        for (let j = 0; j < keys.length; j++) {
          this.fixupKeyObject(keys[j],i,j);
          }
        }
      }
    registerControlPanel(this);
  }

  draw(options) {
    for (const option in options) {
      this[option] = options[option];
    }
    this.drawPanel();
  }

  drawButton(options) {
    const key = options.key;
    const id = key.id;
    const eid = key.eid;
    const width = key.keyWidth;
    const height = key.keyHeight;
    const buttonContainer = document.createElement('a-entity');
    buttonContainer.setAttribute('position', options.position);

    const button = document.createElement('a-entity');
    button.setAttribute('geometry', `primitive: plane; width: ${width}; height: ${height};`);
    if (id) {button.id = id;}

    if (this.keyTexture && this.keyTexture.length > 0) {
      button.setAttribute('material', `src: ${this.keyTexture}`);
    } else {
      button.setAttribute('material', 'color: #4a4a4a; opacity: 0.9');
    }

    buttonContainer.appendChild(button);
      const text = document.createElement('a-text');
      text.id = eid;
      text.setAttribute('key-code', key.code);
      text.setAttribute('panel-row',options.row);
      text.setAttribute('panel-column',options.column);
      text.setAttribute('panel-mode',options.mode);
      text.setAttribute('value', key.label);
      text.setAttribute('align', 'center');
      text.setAttribute('baseline', this.verticalAlign);
      text.setAttribute('position', '0 0 0.001');
      text.setAttribute('width', this.fontSize);
      text.setAttribute('height', this.fontSize);
      text.setAttribute('geometry', `primitive: plane; width: ${width}; height: ${height}`);
      text.setAttribute('material', `shader:flat;opacity: 0.0; transparent: true; color: ${this.highlightColor}`);
      text.setAttribute('color', this.color);
      text.setAttribute('font', this.font);
      text.setAttribute('shader', 'msdf');
      text.setAttribute('negate', 'false');
      text.setAttribute('control-panel-button', true);
      if (key.type != 'readonly') {
          text.setAttribute('class', 'collidable');
      }
      buttonContainer.appendChild(text);

    this.el.appendChild(buttonContainer);
  }

  drawPanel() {
    while (this.el.firstChild) {
      this.el.removeChild(this.el.firstChild);
    }

    if (this.layoutStruct) {
      const keyRows = this.layoutStruct[this.activeMode] || this.layoutStruct['normal'];

      const keyboard = document.createElement('a-entity');
      const keyboardWidth = KEY_SIZE * this.layoutStruct.maxWidth + KEY_PADDING * (this.layoutStruct.maxWidth-1) + KEYBOARD_PADDING * 2;
      const keyboardHeight = KEY_SIZE * keyRows.length + KEY_PADDING * (keyRows.length - 1) + KEYBOARD_PADDING * 2;

      keyboard.setAttribute('position', `${(keyboardWidth / 2) - KEYBOARD_PADDING} ${(-keyboardHeight / 2) + KEYBOARD_PADDING} -0.01`);
      keyboard.setAttribute('geometry', `primitive: plane; width: ${keyboardWidth}; height: ${keyboardHeight}`);

      if (this.baseTexture && this.baseTexture.length > 0) {
        keyboard.setAttribute('material', `src: ${this.baseTexture}`);
      } else {
        keyboard.setAttribute('material', 'color: #4a4a4a; side: double; opacity: 0.7');
      }

      this.el.appendChild(keyboard);

      let positionY = 0;
      for (let i = 0; i < keyRows.length; i++) {
        const keys = keyRows[i];
        let positionX = 0;
        for (let j = 0; j < keys.length; j++) {
          const key = keys[j];
          if (!this.dismissable && key.type && key.type === 'cancel') {
            continue;
          }
          if ( key.keyCode !== null) this.keyCodeLookup[key.keyCode] = key;
          if (key.keyChar != null && key.keyChar.length === 1) this.keyCharLookup[key.keyChar] = key;
          const width = key.keyWidth;
          const height = key.keyHeight;
          if (key.type !== 'blanking') {
            this.drawButton({
              key,
              position: `${positionX + width / 2} ${positionY - height / 2} 0`,
              row: i,
              column: j,
              mode: this.activeMode,
            });
          }
          positionX += parseFloat(width) + KEY_PADDING;

          if (keys.length === (j + 1)) {
            positionY -= KEY_SIZE + KEY_PADDING;
          }
        }
      }
    }
  }

  toggleActiveMode(mode) {
    if (mode === this.activeMode) {
      this.activeMode = 'normal';
      this.drawPanel();
    } else {
      this.activeMode = mode;
      this.drawPanel();
    }
  }
  // See validateKeyboardInput below for how the keyChar and keyCode are used
  fixupKeyObject(keyObject,row,column) {
    keyObject.row = row;
    keyObject.column = column;
    const value = keyObject.value;
    keyObject.label = keyObject.label || value;
    keyObject.width = keyObject.width || 1;
    keyObject.height = keyObject.height || 1;
    keyObject.eid = this.layoutStruct.name + "-" + row.toString() + "-" + column.toString();

    if ("keyCode" in keyObject) {
      keyObject.keyChar = null; // an explicit keyCode overrides a character
    } else if ("keyChar" in keyObject) {
      keyObject.keyCode = null; // so we explicitly know not to use a keyCode
    } else if (value) {// not empty 
      keyObject.keyCode = null;
      keyObject.keyChar = value[0]; // first character of string
    } else {
      keyObject.keyCode = null;
      keyObject.keyChar = null;
    }
    keyObject.keyWidth =  KEY_SIZE * keyObject.width + (KEY_PADDING*(keyObject.width-1));
    keyObject.keyHeight=  KEY_SIZE * keyObject.height;
  }

  lookupKeyChar(k) {
    return this.keyCharLookup[k];
  }
  lookupKeyCode(k) {
    return this.keyCodeLookup[k];
  }
  validateKeyboardInput(e, type) {
    let detail;
    // Depending on the type of the event - either a keyboard event or a raycaster one, we identify the key (if any) which has been pressed.
    if (type === 'vr') {
      // the event knows the id of the target, so we use that to get the info we need to identify the button
      const element = document.querySelector(`#${e.target.id}`);
      const panelRow = parseInt(element.getAttribute('panel-row'));
      const panelColumn = parseInt(element.getAttribute('panel-column'));
      const panelMode = element.getAttribute('panel-mode');
      const keyRows = this.layoutStruct[panelMode];
      detail = keyRows[panelRow][panelColumn];
    } else {
      // The keyCode corresponds to a numeric value for the specific key on a normal keyboard.
      // The keyChar corresponds to a single character representing the value of the character pressed, taking into account layout, locale, shift keys etc.
      // By default, individual layouts use the first character of the label to compare with the keyChar. However, if a specific keyChar is set, that is used instead.
      // And if a keyCode is set, that overrides the keyChar
      // So by default we get something sensible, i.e. pressing a key on the keyboard presses the key with the same character on the screen
      // But we can override which character or even which physical key we want
      // This is still not a completely general solution, but it's good enough for current purposes.
      const keyCode = e.keyCode;
      const keyChar = e.key;
      if (this.ignoredKeys.has(keyCode)) return;
      detail = this.lookupKeyChar(keyChar) || this.lookupKeyCode(keyCode);
    }
    if (!detail) {
      return;
    }
    let inputEvent = new CustomEvent('a-keyboard-update-' + this.layoutStruct.name, {detail});
    if ("toggle" in detail) {
      this.toggleActiveMode(detail.toggle);
      inputEvent = null;
    }
    if ( inputEvent) { 
      document.dispatchEvent(inputEvent);
    }
    // Artificially trigger keypress events for visual feedback when not in vr mode
    if (type !== 'vr') {
      const element = document.querySelector("#"+detail.eid);
      if (element) {
        element.dispatchEvent(new Event('mousedown'));
        setTimeout(function() {
          element.dispatchEvent(new Event('mouseleave'));
        }, 80);
      }
    }
  }


};
let defaultControlPanel = new ControlPanel(defaultLayout);

AFRAME.registerComponent('a-control-panel', {
  schema: {
    layout: {default: "en-us"},
    audio: {default: false}, // Only if adapter supports audio
    color: {default: '#fff'},
    highlightColor: {default: '#1a79dc'},
    dismissable: {default: true},
    font: {default: 'monoid'},
    fontSize: {default: '0.39'},
    locale: {default: 'en'},
    model: {default: ''},
    baseTexture: {default: ""},
    keyTexture: {default: ""},
    verticalAlign: {default: 'center'},
  },

  init: function() {
    this.panel = controlPanelNamed(this.data.layout);
    this.panel.draw({...this.data, el: this.el});
    this.handleKeyboardPress = this.handleKeyboardPress.bind(this);
    this.handleKeyboardVR = this.handleKeyboardVR.bind(this);
    this.attachEventListeners();
  },

  attachEventListeners: function() {
    window.addEventListener('keydown', this.handleKeyboardPress);
    this.el.addEventListener('click', this.handleKeyboardVR);
  },

  removeEventListeners: function() {
    window.removeEventListener('keydown', this.handleKeyboardPress);
    this.el.removeEventListener('click', this.handleKeyboardVR);
  },

  handleKeyboardPress: function(e) {
    this.panel.validateKeyboardInput(e);
  },

  handleKeyboardVR: function(e) {
    this.panel.validateKeyboardInput(e, 'vr');
  },
  
  remove: function() {
    this.removeEventListeners();
  },
});

AFRAME.registerComponent('control-panel-button', {
  init: function() {
    const el = this.el;
    const self = this;
    el.addEventListener('mousedown', function() {
      el.setAttribute('material', 'opacity', '0.7');
    });

    el.addEventListener('mouseup', function() {
      el.setAttribute('material', 'opacity', self.isMouseEnter ? '0.9' : '0');
    });

    el.addEventListener('mouseenter', function() {
      el.setAttribute('material', 'opacity', '0.9');
      self.isMouseEnter = true;
    });

    el.addEventListener('mouseleave', function() {
      el.setAttribute('material', 'opacity', '0');
      self.isMouseEnter = false;
    });
  },
});

export {registerControlPanel,ControlPanel,controlPanelNamed};
