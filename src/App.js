import React from 'react'
import {
  BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"
import Weektable from './components/table/weektable'
import Weektable2 from './components/table/weektable2'
import Navbar from './components/layout/navbar'
function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>
      
        <Switch>
          <Route exact path='/' component={Weektable2} />
          <Route path='/dateTo' component={Weektable} />
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
