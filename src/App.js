import React from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import MonthTable from './components/table/monthTable'
import Navbar from './components/layout/navbar'
import Day from './components/table/day'
import Week from './components/table/week';
import LogIn from './components/auth/login'
import SignUp from './components/auth/signup'
import Ham from './components/layout/hamButton';
import Dashboard from './components/dashboard/dashboard'
import Overdue from './components/tasks/overdue';
import All from './components/tasks/all';
import Modal from './components/table/modal'
import { connect } from 'react-redux'


function App({modalEnable}) {

  return (
    <div className="App">
      <Router>
      <Ham/>
      <Navbar/>
        <Switch>
          <Route exact path='/' component={Day} />
          <Route path='/month' component={MonthTable} />
          <Route path='/week' component={Week} />
          <Route path='/login' component={LogIn} />
          <Route path='/signup' component={SignUp} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/overdue' component={Overdue} />
          <Route path='/all' component={All} />
        </Switch>
      </Router>      

      {/* {modalEnable ? < Modal/> : null} */}
    </div>
  );
}

const mapStateToProps = state => {
  return {
      modalEnable: state.toggleModal.modalEnable,
  }
}

export default connect(mapStateToProps)(App);
