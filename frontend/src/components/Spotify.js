import React, { useEffect } from 'react';
import { searchSpotify, getRandomTrack } from './api'; // Importing the Spotify API functions

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

  return <div>Spotify Component Temp</div>; // Replace with your actual component UI
}

export default Spotify;
