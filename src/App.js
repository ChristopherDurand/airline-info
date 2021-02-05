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
  const [airportFilter, setAirportFilter] = useState('all')
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
  const filteredAirports = DATA.airports.map(airport => {
    return {
      ...airport, 
      disabled: airportFilter !== 'all' && airportFilter !== airport.code,
    };
  });
  
  const filteredRoutes = DATA.routes.filter(route => {
    if(airlineFilter !== 'all' && String(route.airline) !== airlineFilter) {
      return false;
    }
    if(airportFilter !== 'all' && route.src !== airportFilter && route.dest !== airportFilter) {
      return false;
    }
    return true;
  });
  const bothFiltersOff = () => airportFilter === 'all' && airlineFilter === 'all';
  const resetFilters = e => {
    e.preventDefault();
    setAirlineFilter('all');
    setAirportFilter('all');
    
  }
  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
      <p>
        Show flights from <Select 
          options={filteredAirlines} 
          valueKey="id"
          titleKey="name"
          allTitle="All Airlines" 
          value={airlineFilter} 
          onSelect={setAirlineFilter} 
        />
        flying in or out of <Select
          options={filteredAirports}
          valueKey="code"
          titleKey="name"
          allTitle="All Airports"
          value={airportFilter}
          onSelect={setAirportFilter}
        />
        <button disabled={bothFiltersOff()} onClick={resetFilters}>Show All Routes</button>
      </p>
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