import React from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import MonthTable from './components/table/monthTable'
import Navbar from './components/layout/navbar'
import Day from './components/table/day'
import Week from './components/table/week';
import Ham from './components/layout/hamButton';
import LogIn from './components/auth/login'
import SignUp from './components/auth/signup'


function App() {
  return (
    <div className="App">
      <Router>
      <Ham />
      <Navbar/>
        <Switch>
          <Route exact path='/' component={Day} />
          <Route path='/month' component={MonthTable} />
          <Route path='/week' component={Week} />
          <Route path='/login' component={LogIn} />
          <Route path='/signup' component={SignUp} />
        </Switch>
      </Router>      
    </div>
  );
}

export default App;
