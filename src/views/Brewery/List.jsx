import React from 'react';
import { useNavigate } from 'react-router-dom';
import BreweryListItem from './components/BreweryListItem';

const PAGE_SIZE = 10;

export default function BreweryList() {
  const [breweries, setBreweries] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchBreweries = async () => {
      try{
        const response = await fetch(`https://api.openbrewerydb.org/breweries?page=${currentPage}&per_page=${PAGE_SIZE}`);
        const json = await response.json()
        setBreweries(json);
      } catch(err) {
        throw Error('Unable to fetch breweries:', err);
      }
      setIsLoading(false);
    }
      fetchBreweries();
  }, [currentPage])

  const handleChange = (event) => {
    event.preventDefault();
    setSearch(event.target.value)
  }

  const next = () => {
    setCurrentPage(currentPage + 1)
  }

  const previous = () => {
    setCurrentPage(currentPage - 1)
  }

  return (
    <main>
      <h1 className="header">Brewery Catalog</h1>
      <form className="actions">
        <input className="input" onChange={(e) => handleChange(e)} type='text' name='search' placeholder='Find a brewery' />
        <button className="button" onClick={() => navigate(`/breweries/search?query=${search}`)} type='submit'>Search</button>
        <button className="button" type='reset'>Reset</button>
      </form>
      <ul className="list-container">
        {isLoading ? 'Spinner and/or skeleton goes here' : breweries.map(brewery => <BreweryListItem key={brewery.id} brewery={brewery}/>)}
      </ul>
      <div className="pagination">
        <div className="button-container">
          {currentPage > 1 && (<button onClick={previous} className="button">Previous</button>)}
        </div>
        <div className="button-container">
          <button onClick={next} className="button">Next</button>
        </div>
      </div>
    </main>
  );
}
