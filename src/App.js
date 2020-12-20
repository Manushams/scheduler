import React from 'react'
import {BrowserRouter as Router, Switch, Route, } from "react-router-dom"
import Weektable from './components/table/weektable'
import Weektable2 from './components/table/weektable2'
import MonthTable from './components/table/monthTable'
import Navbar from './components/layout/navbar'
import Today from './components/table/today'
import Day from './components/table/day'
import Week from './components/table/week';
import Ham from './components/layout/hamButton';
import 'firebase/firestore' ;


function App() {
  return (
    <div className="App">
      <Router>
      <Ham />
      <Navbar/>
        <Switch>
          <Route exact path='/' component={Weektable2} />
          <Route path='/dateTo' component={Weektable} />
          <Route path='/month' component={MonthTable} />
          <Route path='/today' component={Today} />
          <Route path='/day' component={Day} />
          <Route path='/week' component={Week} />
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
