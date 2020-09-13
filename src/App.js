import React from 'react'
//import Weektable from './components/table/weektable'
import Weektable2 from './components/table/weektable2'
import Navbar from './components/layout/navbar'
function App() {
  return (
    <div className="App">
      <Navbar/>
      <div className="main">
        <Weektable2 />
      </div>
    </div>
  );
}

export default App;
