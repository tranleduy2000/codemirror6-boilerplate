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

let doc = `
CM6Sqrt[CM6Fraction[Table[RandomInteger[5], {i,1,5}], 2]]

{0,CM6Sqrt[2],CM6Sqrt[CM6Fraction[3, 2]],CM6Sqrt[CM6Fraction[5, 2]],1}

(CM6Grid[{{0, 1}, {1, 0}}, RowSpacings -> 1, ColumnSpacings -> 1, RowAlignments -> Baseline, ColumnAlignments -> Center])
`;


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

