import React, { useState } from 'react';
import SpotifyUI from './SpotifyUI';
var bp = require('./Path.js');

function Spotify() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [randomTrack, setRandomTrack] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSearch = async (query) => {
        try
        {    
            const response = await fetch(bp.buildPath('api/spotify/search'), {
              method:'POST',
              body:js_register,
              headers:{'Content-Type': 'application/json'}
            });
        } 
        catch (error) {
            setErrorMessage('Failed to search Spotify.');
            console.error('Spotify Search API error:', error);
        }
    };

    const handleRandomTrack = async () => {
        try
        {    
            const response = await fetch(bp.buildPath('api/spotify/random-track'), {
              method:'POST',
              body:js_register,
              headers:{'Content-Type': 'application/json'}
            });
        } catch (error) {
            setErrorMessage('Failed to fetch random track from Spotify.');
            console.error('Spotify Random Track API error:', error);
        }
    };

    return (
        <SpotifyUI
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchResult={searchResult}
            randomTrack={randomTrack}
            errorMessage={errorMessage}
            handleSearch={handleSearch}
            handleRandomTrack={handleRandomTrack}
        />
    );
}

export default Spotify;
