import React from 'react';
import '../assets/App.css'
import Header from './Header';
import Graphs from './Graph';
import Table from './Table';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Table />
      <Graphs />
    </div>
  );
}

export default App;
