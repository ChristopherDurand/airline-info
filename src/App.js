import React, { useState } from 'react';
import './App.css';
import Table from './components/Table';
import Select from './components/Select';
import Map from './components/Map';

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

  const filteredRoutes = DATA.routes.filter(route => 
    (airlineFilter === 'all' || String(route.airline) === airlineFilter) &&
    (airportFilter === 'all' || route.src === airportFilter || route.dest === airportFilter) 
  );

  const filteredAirlines = DATA.airlines.map(airline => {
    const disabled = !filteredRoutes.find(route => route.airline === airline.id)
    return {
      ...airline,
      disabled
    };
  });

  const filteredAirports = DATA.airports.map(airport => {
    const disabled = !filteredRoutes.find(route => airport.code === route.src || airport.code === route.dest)
    return {
      ...airport,
      disabled
    };
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
        <Map routes={filteredRoutes} />
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