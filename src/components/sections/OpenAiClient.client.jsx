import {useState} from 'react';

export default function OpenAiClient() {
  const [animalInput, setAnimalInput] = useState('');
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({animal: animalInput}),
    });
    const data = await response.json();
    setResult(data.result);
    setAnimalInput('');
  }

  return (
    <div>
      <section>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </section>

      <main>
        <h3>Name my pet</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Enter an animal"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Generate names" />
        </form>
        <div>{result}</div>
      </main>
    </div>
  );
}
