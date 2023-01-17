import {useState, useEffect} from 'react';

export function CountupEntries({test}) {
  const [entries, setEntries] = useState(null);

  useEffect(() => {
    fetch('/api/countupDBGet')
      .then((response) => response.json())
      .then((data) => console.log(data));
  });

  return (
    <div className="m-4">
      <h1>Entries</h1>
      <p>{test}</p>
    </div>
  );
}
