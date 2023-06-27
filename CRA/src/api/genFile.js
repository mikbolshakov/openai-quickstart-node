// import { Configuration, OpenAIApi } from "openai";

// const configuration = new Configuration({apiKey: process.env.REACT_APP_OPENAI_API_KEY});
// const openai = new OpenAIApi(configuration);


// export async function replaceWordInFile(file, word) {
//   if (!configuration.apiKey) {
//     throw new Error("OpenAI API key not configured");
//   }

//   try {
//     const fileData = new FormData();
//     fileData.append("file", file);
//     fileData.append("word", word);

//     const response = await fetch("/replace-word", {
//       method: "POST",
//       body: fileData,
//     });

//     if (!response.ok) {
//       throw new Error("Failed to replace word in file");
//     }

//     return response.blob();
//   } catch (error) {
//     console.error(`Error replacing word in file: ${error.message}`);
//     throw new Error("An error occurred while replacing the word in the file.");
//   }
// }


