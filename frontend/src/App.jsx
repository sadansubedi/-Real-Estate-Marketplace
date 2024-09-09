import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
import About from './pages/About.jsx'
import Signin from './pages/Signin.jsx'
import Signup from './pages/Signup.jsx'
import Header from "./components/Header.jsx"
import PrivateRoute from "./components/PrivateRoute.jsx"
import CreateListing from "./pages/CreateListing.jsx"
import Updatelisting from "./pages/Updatelisting.jsx"
import Listing from "./pages/Listing.jsx"
function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/listing/:listingId" element={<Listing/>}/>
      <Route element={<PrivateRoute/>}>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/create-listing" element={<CreateListing/>}/>
      <Route path="/update-listing/:listingId" element={<Updatelisting/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App

