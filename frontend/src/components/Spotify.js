import React, { useState } from 'react';
import SpotifyUI from './SpotifyUI';
import { searchSpotify, getRandomTrack } from '/api';

function Spotify() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [randomTrack, setRandomTrack] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSearch = async (query) => {
        try {
            const result = await searchSpotify(query, 'track');
            setSearchResult(result);
        } catch (error) {
            setErrorMessage('Failed to search Spotify.');
            console.error('Spotify Search API error:', error);
        }
    };

    const handleRandomTrack = async () => {
        try {
            const track = await getRandomTrack('rock');
            setRandomTrack(track);
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
