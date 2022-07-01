import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function BreweryDetail() {
  const { id } = useParams();
  const [brewery, setBrewery] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBreweryById = async () => {
      try {
        const response = await fetch(`https://api.openbrewerydb.org/breweries/${id}`);
        const json = await response.json();
        setBrewery(json);
        setIsLoading(false);
      } catch(err) {
        setIsLoading(false);
        throw Error(`Unable to fetch data for ${id}: ${err}`)
      }
    }
    fetchBreweryById();
  }, [id])

  return (
    <main className="list-item">
      {isLoading ? 'Loading skeleton goes here' : (
        <>
        <h1 className="header">{brewery.name}</h1>
        <p>{brewery.city}, {brewery.state}</p>
        <p>{brewery.country}</p>
        <p>{brewery.phone}</p>
        {brewery.website_url && (
          <p>
            <a href={brewery.website_url} target='_blank' rel="noreferrer">View Website</a>
          </p>
          )}
        <Link to='/breweries'>Back to Breweries</Link>
        </>
        )}
    </main>
  );
}
