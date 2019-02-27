import { editor as monaco } from "monaco-editor";

const editor = monaco.create(document.getElementById("container"), {
  value: "",
  lineNumbers: "off",
  scrollBeyondLastLine: false,
  theme: "vs-dark",
  minimap: { enabled: false },
  cursorStyle: "block",
  cursorBlinking: "smooth",
  hideCursorInOverviewRuler: true,
  matchBrackets: false,
  overviewRulerBorder: false,
  renderLineHighlight: "none"
});

editor.getModel().updateOptions({ tabSize: 2 });
editor.focus();

window.addEventListener("resize", () => {
  editor.layout();
});
