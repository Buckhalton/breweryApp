import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import BreweryListItem from "./components/BreweryListItem";


const BrewerySearchResults = () => {
    const [searchParams] = useSearchParams();
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const searchBreweries = async () => {
            try {
              const response = await fetch(`https://api.openbrewerydb.org/breweries/search?query=${searchParams.get('query')}`)
              const json = await response.json();
              setSearchResults(json);
            } catch (err) {
              throw Error('Unable to search breweries', err);
            }
            setIsLoading(false);
          }
          searchBreweries();
    }, [searchParams])

return (
    <div>
         <Link to='/breweries'>Back to Breweries</Link>
         <h1>Search Results</h1>
      <ul>
        {isLoading ? 'Spinner and/or skeleton goes here' : searchResults.map(brewery => <BreweryListItem key={brewery.id} brewery={brewery}/>)}
      </ul>
    </div>
)
}
export default BrewerySearchResults;