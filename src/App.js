import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import BreweryList from './views/Brewery/List';
import BreweryDetail from './views/Brewery/Detail';
import BrewerySearchResults from './views/Brewery/BrewerySearchResults';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='breweries/search' element={<BrewerySearchResults />}/>
        <Route path='/breweries/:id' element={<BreweryDetail />} />
        <Route path='/breweries' element={<BreweryList />} />
        <Route path='/' element={<Navigate to='/breweries' replace />} />
      </Routes>
    </Router>
  );
}

export default App;
