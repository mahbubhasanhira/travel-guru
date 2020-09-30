import React, { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import HotelDetails from './Components/HotelDetails/HotelDetails';
import Login from './Components/Login/Login';
import NotFound from './Components/NotFound/NotFound';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [destination, setDestination] = useState({})
  console.log(loggedInUser)
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser, destination, setDestination]}>
        <Router>
        <Header/>
          <Switch>
          <Route path='/login'>
              <Login/>
            </Route>
            <PrivateRoute path='/hoteldetails'>
              <HotelDetails/>
            </PrivateRoute>
            <Route exact path='/'>
              <Home/>
            </Route>
            <Route path='*'>
              <NotFound/>
            </Route>
          </Switch>
        </Router>
    </UserContext.Provider>
  );
}

export default App;
