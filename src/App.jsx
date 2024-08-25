import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
import About from './pages/About.jsx'
import Signin from './pages/Signin.jsx'
import Signout from './pages/Signout.jsx'
import Header from "./components/Header.jsx"
function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/signout" element={<Signout/>}/>
    </Routes>
    {/* <h1 className='text-green-700 bg-slate-950'>aba app hoina </h1> */}
    </BrowserRouter>
  )
}

export default App