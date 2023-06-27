import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({apiKey: process.env.REACT_APP_OPENAI_API_KEY});
const openai = new OpenAIApi(configuration);

export async function generateAnimalNames(animal) {
  if (!configuration.apiKey) {
    throw new Error("OpenAI API key not configured");
  }

  if (animal.trim().length === 0) {
    throw new Error("Please enter a valid animal");
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(animal),
      temperature: 0.6,
    });

    return completion.data.choices[0].text;

  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      throw error.response.data;
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      throw new Error("An error occurred during your request.");
    }
  }
}

function generatePrompt(animal) {
  const capitalizedAnimal = animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `Suggest three names for an animal that is a superhero.
  Animal: Cat
  Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
  Animal: Dog
  Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
  Animal: ${capitalizedAnimal}
  Names:`;
}
