import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function BreweryList() {
  const [breweries, setBreweries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBreweries = async () => {
      try{
        const response = await fetch('https://api.openbrewerydb.org/breweries?per_page=10');
        const json = await response.json()
        setBreweries(json);
        setIsLoading(false);
      } catch(err) {
        setIsLoading(false);
        throw Error('Unable to fetch breweries:', err);
      }
    }
    fetchBreweries();
  }, [])

  return (
    <main>
      <h1>Brewery Catalog</h1>
      <form>
        <input type='text' name='search' placeholder='Find a brewery' />
        <button type='submit'>Search</button>
        <button type='reset'>Reset</button>
      </form>
      <ul>

      {isLoading ? 'Spinner and/or skeleton goes here' : breweries.map(brewery => {
        return (
          <li>
            <Link to={`/breweries/${brewery.id}`}>{brewery.name}</Link>
            <p>{`${brewery.city}, ${brewery.state}`}</p>
          </li>
        )
      })}
      </ul>
    </main>
  );
}
