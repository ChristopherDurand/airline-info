import React, { Component } from 'react';
import './App.css';
import Data from './data';

const App = () => {
  const key = route => `${route.airline}${route.src}${route.dest}`
  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <table className='routes-table'>
        <thead>
          <tr>
            <th>Airline</th>
            <th>Source</th>
            <th>Destination</th>
          </tr>
        </thead>
        <tbody>
          {Data.routes.map(route =>
            <tr key={key(route)}>
              <td>{route.airline}</td>
              <td>{route.src}</td>
              <td>{route.dest}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
};

export default App;