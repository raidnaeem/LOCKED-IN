import React, { useEffect } from 'react';
import { searchSpotify, getRandomTrack } from './api'; // Importing the Spotify API functions
var bp = require('./Path.js'); // Importing the variable bp from Path.js

function Spotify() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const searchResult = await searchSpotify('song name', 'track');
        console.log('Search Result:', searchResult);

        const randomTrack = await getRandomTrack('rock');
        console.log('Random Track:', randomTrack);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  return <div>{bp}</div>; // Rendering the variable bp from Path.js
}

export default Spotify;