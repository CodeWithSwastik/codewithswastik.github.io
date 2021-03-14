// Retrieve Elements
const executeCodeBtn = document.querySelector(".editor__run");
const resetCodeBtn = document.querySelector(".editor__reset");
const console_ = document.querySelector(".editor__console");

// Setup Ace
let codeEditor = ace.edit("editorCode");
let defaultCode = 'output "Hello World!"';

let editorLib = {
  init() {
    // Configure Ace

    // Theme
    codeEditor.setTheme("ace/theme/monokai");

    // Set language
    codeEditor.session.setMode("ace/mode/python");
    codeEditor.setFontSize(22);

    // Set Default Code
    codeEditor.setValue(defaultCode);
  },
};

// Events
executeCodeBtn.addEventListener("click", () => {
  // Get input from the code editor
  const userCode = codeEditor.getValue();
  const params = { code: userCode };

  const url = "https://swas.vercel.app/api/run?" + new URLSearchParams(params);

  console.log(url);
  console_.innerText = "Processing....";
  try {
    fetch(url)
      .then((response) => response.json())
      .then((data) => (console_.innerText = data["stdout"] + data["stderr"]));
  } catch (err) {
    console.error(err);
  }
});

resetCodeBtn.addEventListener("click", () => {
  // Clear ace editor
  codeEditor.setValue("");
});

editorLib.init();
