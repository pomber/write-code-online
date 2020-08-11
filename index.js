import * as monaco from "monaco-editor/esm/vs/editor/editor.api.js";
import "./features";

self.MonacoEnvironment = {
  getWorker: (moduleId, label) =>
    new Worker("./node_modules/monaco-editor/esm/vs/editor/editor.worker.js")
};

const initialText = "write here..";
const editor = monaco.editor.create(document.getElementById("container"), {
  value: initialText,
  lineNumbers: "off",
  scrollBeyondLastLine: false,
  theme: "vs-dark",
  minimap: { enabled: false },
  cursorStyle: "block",
  cursorBlinking: "solid",
  hideCursorInOverviewRuler: true,
  matchBrackets: false,
  overviewRulerBorder: false,
  renderLineHighlight: "none",
  wordWrap: "on"
});

editor.getModel().updateOptions({ tabSize: 2 });
editor.setPosition({ column: initialText.length + 1, lineNumber: 1 });
editor.focus();

window.addEventListener("resize", () => {
  editor.layout();
});

document.addEventListener(
  "keydown",
  e => {
    if ((e.metaKey || e.ctrlKey) && e.keyCode == 83) {
      e.preventDefault();
      // do nothing
    }
  },
  false
);

document.getElementById("fullscreen-button").addEventListener("click", () => {
  // From https://stackoverflow.com/a/54895933/1325646
  let doc = document,
    elm = doc.documentElement;

  const isFullScreen =
    doc.fullscreenElement ||
    doc.mozFullScreen ||
    doc.msFullscreenElement ||
    doc.webkitIsFullscreen;

  if (elm.requestFullscreen) {
    !isFullScreen ? elm.requestFullscreen() : doc.exitFullscreen();
  } else if (elm.mozRequestFullScreen) {
    !isFullScreen ? elm.mozRequestFullScreen() : doc.mozCancelFullScreen();
  } else if (elm.msRequestFullscreen) {
    !isFullScreen ? elm.msRequestFullscreen() : doc.msExitFullscreen();
  } else if (elm.webkitRequestFullscreen) {
    !isFullScreen
      ? elm.webkitRequestFullscreen()
      : doc.webkitCancelFullscreen();
  } else {
    console.log("Fullscreen support not detected.");
    return;
  }

  if (isFullScreen) {
    document.getElementById("enter-fullscreen").style.display = "";
    document.getElementById("exit-fullscreen").style.display = "none";
    document.getElementById("fullscreen-button").style.opacity = 0.2;
    document.getElementById("github-link").style.opacity = 0.1;
  } else {
    document.getElementById("enter-fullscreen").style.display = "none";
    document.getElementById("exit-fullscreen").style.display = "";
    document.getElementById("fullscreen-button").style.opacity = 0.1;
    document.getElementById("github-link").style.opacity = 0;
  }
});
