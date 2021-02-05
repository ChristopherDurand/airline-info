import React, { useState } from 'react';
import DATA from '../data';

const Map = ({
  routes,
}) => {
    // This is to make looking up the latitude and longitude of the airports faster
    const setupAirports = () => {
      const airports = {};
      DATA.airports.forEach(airport => 
        airports[airport.code] = {
          name: airport.name,
          lat: airport.lat,
          long: airport.long,
        }
      );
      return airports
    }
    const [airports] = useState(setupAirports())
    
  return (
    <svg className="map" viewBox="-180 -90 360 180">
      <g transform="scale(1 -1)">
        <image xlinkHref="equirectangular_world.jpg" href="equirectangular_world.jpg" x="-180" y="-90" height="100%" width="100%" transform="scale(1 -1)"/>
        
        {routes.map(route => {
          const x1 = airports[route.src].long;
          const x2 = airports[route.dest].long;
          const y1 = airports[route.src].lat;
          const y2 = airports[route.dest].lat;
          
          return (
            <g key={Object.values(route).join('-')}>
              <circle className="source" cx={x1} cy={y1}>
                <title></title>
              </circle> 
              <circle className="destination" cx={x1} cy={y1}>
                <title></title>
              </circle>
              <path d={`M${x1} ${y1} L ${x2} ${y2}`} />
            </g>
          )
        })}
        
      </g>
    </svg>
  )
}
export default Map;
