import React from 'react'
import WeekTable from './components/table/weektable'
import Navbar from './components/layout/navbar'
function App() {
  return (
    <div className="App">
      <Navbar/>
      <div className="main">
        <WeekTable/>
      </div>
    </div>
  );
}

export default App;
