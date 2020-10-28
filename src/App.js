import React from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"
import Weektable from './components/table/weektable'
import Weektable2 from './components/table/weektable2'
import MonthTable from './components/table/monthTable'
import Navbar from './components/layout/navbar'
import Today from './components/table/today'

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>
      
        <Switch>
          <Route exact path='/' component={Weektable2} />
          <Route path='/dateTo' component={Weektable} />
          <Route path='/month' component={MonthTable} />
          <Route path='/today' component={Today} />
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
