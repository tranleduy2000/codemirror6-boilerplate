import { minimalSetup, EditorView } from "codemirror";

import { keymap } from "@codemirror/view";

import { wolframLanguage } from "./src/mathematica/mathematica";
 
import { bracketMatching } from "@codemirror/language"

import rainbowBrackets from 'rainbowbrackets'


let editorCustomTheme = EditorView.theme({
  "&.cm-focused": {
    outline: "dotted 1px black",
    background: 'inherit'
  },
  ".cm-line": {
    padding: 0,
    'padding-left': '2px',
    'align-items': 'center'
  },
  ".cm-activeLine": {
    'background-color': 'transparent'
  }
});

let doc = `NIntegrate((x-1)*(x-0.5)*x*(x+0.5)*(x+1), {x,0,1}, Method->LegendreGauss)`;


let Editor = new EditorView({
  doc: doc,
  extensions: [
    minimalSetup,
    editorCustomTheme,   
    wolframLanguage, 
    bracketMatching(),
    rainbowBrackets(),
    keymap.of([
      { key: "Shift-Enter", preventDefault: true, run: function (editor, key) { 
        //here you can evaluate the result
        alert(editor.state.doc.toString());
        return true;
      } }
    ])
  ],
  parent: document.querySelector("#editor")
});

