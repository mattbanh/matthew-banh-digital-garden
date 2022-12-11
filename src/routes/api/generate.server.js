// import {Configuration, OpenAIApi} from 'openai';

// const configuration = new Configuration({
//   apiKey: Oxygen?.env?.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

export async function api(_request) {
  // const completion = await openai.createCompletion({
  //   model: 'text-davinci-002',
  //   prompt: req.body.animal,
  //   temperature: 0.6,
  // });
  return JSON.stringify({result: 2});
}

// function generatePrompt(animal) {
//   const capitalizedAnimal =
//     animal[0].toUpperCase() + animal.slice(1).toLowerCase();
//   return `Suggest three names for an animal that is a superhero.

// Animal: Cat
// Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
// Animal: Dog
// Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
// Animal: ${capitalizedAnimal}
// Names:`;
// }

// export async function api(_request) {
//   const obj = {id: 1, name: 'hello'};
//   return JSON.stringify(obj);
// }
