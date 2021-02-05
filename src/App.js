import React, { useState } from 'react';
import './App.css';
import Table from './components/Table';
import Select from './components/Select';

import DATA, {
  getAirlineById,
  getAirportByCode,
} from './data';

const App = () => {
  const [airlineFilter, setAirlineFilter] = useState('all')
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

  const filteredAirlines = DATA.airlines.map(airline => {
    return {
      ...airline, 
      disabled: airlineFilter !== 'all' && airlineFilter !== String(airline.id),
    };
  });
  const filteredRoutes = DATA.routes.filter(route => 
    airlineFilter === 'all' || String(route.airline) === airlineFilter
  );

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
      <Select 
        options={filteredAirlines} 
        valueKey="id"
        titleKey="name"
        allTitle="All Airlines" 
        value="all" 
        onSelect={e => setAirlineFilter(e.target.value)} 
      />
      <Table 
        className='routes-table'
        columns={columns} 
        rows={filteredRoutes} 
        format={formatAirlineNames} 
        perPage={25}
      />
      </section>
    </div>
  )
};

export default App;