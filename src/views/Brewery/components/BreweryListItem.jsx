import { Link } from 'react-router-dom';

const BreweryListItem = ({brewery}) => {
    return (
        <li class="list-item">
            <Link class="link" to={`/breweries/${brewery.id}`}>{brewery.name}</Link>
            <p>{`${brewery.city}, ${brewery.state}`}</p>
        </li>
    )
}

export default BreweryListItem