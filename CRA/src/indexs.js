import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [file, setFile] = useState();
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch("/api/generate", {
        method: "POST",
        body: formData,
      });

      if (response.status !== 200) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'result.docx');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch(error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Upload a doc/docx file</h3>
        <form onSubmit={onSubmit}>
          <input
            type="file"
            name="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input type="submit" value="Generate new file" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
