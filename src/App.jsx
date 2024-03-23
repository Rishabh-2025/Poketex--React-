import { Link } from 'react-router-dom'
import './App.css'
import Pokedex from './components/Pokedex/Pokedex'
import CustomRouters from './routes/CustomRoutes'

function App() {


  return (
    <div className='outer-pokemon'>
    <h1 className="pokedex-heading">
      <Link to ='/'>Pokedex</Link></h1>
      <CustomRouters/>
    </div>
  )
}

export default App
