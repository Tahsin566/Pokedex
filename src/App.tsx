
import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import Details from './pages/Details'


const App = () => {

  
  return (
    <>

      <div className='bg-neutral-200'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/details/:id' element={<Details />} />
      </Routes>
      </div>
      
    </>

  )
}

export default App
