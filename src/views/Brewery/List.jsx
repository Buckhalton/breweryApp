import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BreweryListItem from './components/BreweryListItem';

export default function BreweryList() {
  const [breweries, setBreweries] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBreweries = async () => {
      try{
        const response = await fetch('https://api.openbrewerydb.org/breweries?per_page=10');
        const json = await response.json()
        setBreweries(json);
      } catch(err) {
        throw Error('Unable to fetch breweries:', err);
      }
      setIsLoading(false);
    }
      fetchBreweries();
  }, [])

  const handleChange = (event) => {
    event.preventDefault();
    setSearch(event.target.value)
  }

  return (
    <main>
      <h1>Brewery Catalog</h1>
      <form>
        <input onChange={(e) => handleChange(e)} type='text' name='search' placeholder='Find a brewery' />
        <button onClick={() => navigate(`/breweries/search?query=${search}`)} type='submit'>Search</button>
        <button type='reset'>Reset</button>
      </form>
      <ul>
        {isLoading ? 'Spinner and/or skeleton goes here' : breweries.map(brewery => <BreweryListItem key={brewery.id} brewery={brewery}/>)}
      </ul>
    </main>
  );
}
