
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import { Login } from '@mui/icons-material';
import GoogleLogin from 'react-google-login';
// import Login from './components/Login';


const App = () => {
  return (
    <>
    <Navbar/>
    <Home/>
    <Login/>
    </>
  )
}

export default App;
