import * as monaco from "monaco-editor";

const editor = monaco.editor.create(document.getElementById("container"), {
  value: "",
  lineNumbers: "off",
  scrollBeyondLastLine: false,
  theme: "vs-dark",
  minimap: { enabled: false },
  cursorStyle: "block",
  cursorBlinking: "smooth"
});

editor.focus();

window.addEventListener("resize", () => {
  editor.layout();
});
