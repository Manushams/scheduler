import React from 'react'
import Weektable from './components/table/weektable'
import Navbar from './components/layout/navbar'
function App() {
  return (
    <div className="App">
      <Navbar/>
      <div className="main">
        <Weektable ref={WeekTable => window.WeekTable = WeekTable}/>
      </div>
    </div>
  );
}

export default App;
