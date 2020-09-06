import React from 'react';
import '../assets/App.css'
import Header from './Header';
import Graphs from './Graph';
import Table from './Table';

const App = () => {
  return (
    <div className="App">
      <Header />
      <main>
        <section className="main-table">
          <Table />
        </section>
        <section className="main-graphs">
          <Graphs />
        </section>
      </main>   
    </div>
  );
}

export default App;
