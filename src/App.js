import React from 'react';
import './App.css';
import Table from './components/Table';
import DATA, {
  getAirlineById,
  getAirportByCode,
} from './data';

const App = () => {
  const columns = [
    {name: 'Airline', property: 'airline'},
    {name: 'Source Airport', property: 'src'},
    {name: 'Destination Airport', property: 'dest'},
  ];
  const formatAirlineNames = (property, value) => {
    if (property === 'airline') {
      return getAirlineById(value).name;
    } else {
      return getAirportByCode(value).name;
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <Table 
        columns={columns} 
        rows={DATA.routes} 
        format={formatAirlineNames} 
      />
    </div>
  )
};

export default App;