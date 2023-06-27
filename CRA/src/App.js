import React from "react";
import "./App.css";
import { generateAnimalNames } from "./api/genName.js";
import { replaceWordInFile } from "./api/genFile.js"


function App() {
  const [animalInput, setAnimalInput] = React.useState("");
  const [file, setFile] = React.useState();
  const [result, setResult] = React.useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const generatedNames = await generateAnimalNames(animalInput);
      setResult(generatedNames);
      setAnimalInput("");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  async function onCheckFile(event) {
    event.preventDefault();
    if (!file) {
      alert("Please select a file");
      return;
    }
    try {
      const replacedFile = await replaceWordInFile(file, "chocolate");
      downloadFile(replacedFile, "replaced_file.docx");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  function downloadFile(fileData, fileName) {
    const blob = new Blob([fileData], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="main">
      {/* <div className="file">
        <h3>Upload a doc/docx file</h3>
        <form onSubmit={onCheckFile}>
          <input
            type="file"
            name="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input type="submit" value="Replace and Download File" />
        </form>

      </div> */}
      <div className="animal">
        <h3>Enter something</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Enter something"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Generate" />
        </form>
        <div>{result}</div>
      </div>
    </div>
  );
}

export default App;
