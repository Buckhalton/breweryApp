import React from 'react';
import { useNavigate } from 'react-router-dom';
import BreweryListItem from './components/BreweryListItem';

const PAGE_SIZE = 10;

export default function BreweryList() {
  const [breweries, setBreweries] = React.useState([]);
  const [search, setSearch] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [filterType, setFilterType] = React.useState('city');
  const [filterValue, setFilterValue] = React.useState('');
  const navigate = useNavigate();

  
  React.useEffect(() => {
    const getApiUrl = () => {
      if(filterValue) {
        return `https://api.openbrewerydb.org/breweries?by_${filterType}=${filterValue}&page=${currentPage}&per_page=${PAGE_SIZE}`
      } else {
        return `https://api.openbrewerydb.org/breweries?page=${currentPage}&per_page=${PAGE_SIZE}`
      }
    }

    const fetchBreweries = async () => {
      try{
        const apiUrl = getApiUrl();
        const response = await fetch(apiUrl);
        const json = await response.json()
        setBreweries(json);
      } catch(err) {
        throw Error('Unable to fetch breweries:', err);
      }
      setIsLoading(false);
    }

      fetchBreweries();
  }, [currentPage, filterValue, filterType])

  const handleSearchChange = (event) => {
    event.preventDefault();
    setSearch(event.target.value)
  }

  const handleFilterValueChange = (event) => {
    event.preventDefault();
    setFilterValue(event.target.value)
  }

  const next = () => {
    setCurrentPage(currentPage + 1)
  }

  const previous = () => {
    setCurrentPage(currentPage - 1)
  }

  const handleFilterTypeChange = (event) => {
    event.preventDefault();
    setFilterType(event.target.value);
  }

  return (
    <main>
      <h1 className="header">Brewery Catalog</h1>
      <form className="actions">
        <input className="input" onChange={(e) => handleSearchChange(e)} type='text' name='search' placeholder='Find a brewery' />
        <label htmlFor="filters">Filter:</label>
        <select onChange={(e) => handleFilterTypeChange(e)} name="filters" id="filters">
          <option value="city">City</option>
          <option value="state">State</option>
          <option value="type">Type</option>
        </select>
        <input onChange={(e) => handleFilterValueChange(e)} className="input" type="text" name="search" placeholder={`Filter by ${filterType}`} />
        <button className="button" onClick={() => navigate(`/breweries/search?query=${search}`)} type='submit'>Search</button>
        {/* todo: filter state will persist through form reset */}
        <button className="button" type='reset'>Reset</button>
      </form>
      <ul className="list-container">
        {isLoading ? 'Spinner and/or skeleton goes here' : breweries.map(brewery => <BreweryListItem key={brewery.id} brewery={brewery}/>)}
      </ul>
      <div className="pagination-container">
        <div className="button-container">
          {currentPage > 1 && (<button onClick={previous} className="button">Previous</button>)}
        </div>
        <div className="button-container">
          {/* Kinda messy, but the API provides no way of knowing the last page */}
          {breweries.length === 10 && <button onClick={next} className="button">Next</button>}
        </div>
      </div>
    </main>
  );
}
